class DASHBOARD {
	private root = '/i'

	HOME = this.root
	TASKS = `${this.root}/tasks_new`
	HABITS = `${this.root}/habits`
	TIMER = `${this.root}/timer`
	TIME_BLOCKING = `${this.root}/time-blocking`
	SETTINGS = `${this.root}/settings`
	LOGIN = `${this.root}/auth`
}

export const DASHBOARD_PAGES = new DASHBOARD()
