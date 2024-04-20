import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from '../dto/auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: AuthDto) {
    return dto;
  }
  //   const user = await this.userService.getByEmail(dto.email);
  //   if (!user) {
  //     return null;
  //   }
  //   return {
  //     token: this.jwtService.sign({ id: user.id }),
  //     user,
  //   };
  // }
}
