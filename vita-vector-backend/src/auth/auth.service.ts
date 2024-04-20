import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from '../dto/auth.dto';
import { verify } from 'argon2';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
  REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
  EXPIRES_IN_DAYS_REFRESH_TOKEN = 1;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}



  async login(dto: AuthDto) {
    const {password, ...user} = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return {
      ...tokens,
      user,
    };
  }

  async register(dto: AuthDto) {
    const existingUser = await this.userService.getByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const {password, ...user} = await this.userService.create(dto);

    const tokens = this.issueTokens(user.id);

    return {
      ...tokens,
      user,
    };
  }

  private issueTokens(userId: string) {
    const data = {id: userId};
    const accessToken = this.jwtService.sign(data, {expiresIn: '1h'});
    const refreshToken = this.jwtService.sign(data, {expiresIn: '7d'});

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await verify(user.password, dto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async getAccessToken(refreshToken: string) {
    const result = this.jwtService.verify(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = this.issueTokens(user.id);

    return {
      ...tokens,
      user,
    };

  }

  addRefreshToken(res: Response, refreshToken: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + this.EXPIRES_IN_DAYS_REFRESH_TOKEN);
    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('COOKIES_ATTR_DOMAIN'),
      expires,
      secure: true,
      sameSite: this.configService.get('COOKIES_ATTR_SAME_SITE')
    })
  }

  removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('COOKIES_ATTR_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: this.configService.get('COOKIES_ATTR_SAME_SITE')
    })
  }
}
