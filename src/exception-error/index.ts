export class HttpError extends Error {
    status: number;
    constructor(status:number,message:string) {
        super(message);
        this.status = status;
    }
}

export class NotFound extends HttpError {
    constructor(message:string) {
        super(404,message);
        this.message = "not found"
    }
}

