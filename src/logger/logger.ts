export interface IAppError {
  statusCode: number
  isOperational: boolean
  message: string
}

export interface IErrorLogger {
  logError(error: IAppError): void
}

export class AppError extends Error implements IAppError {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number, isOperational: boolean) {
    super(message)

    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ConsoleErrorLogger implements IErrorLogger {
  logError(error: IAppError): void {
    console.error(`Error: ${error.message} , Status Code: ${error.statusCode}`)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Error 404 não encontrado") {
    super(message, 404, true)
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Dados invalido verifique a validação") {
    super(message, 404, true)
  }
}

export class ServerError extends AppError {
  constructor(
    message: string = "error 500 acesso invalido verifique o servidor",
  ) {
    super(message, 500, false)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Acesso não autorizado") {
    super(message, 401, true)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Acesso Proibido") {
    super(message, 403, true)
  }
}

export class deleteError extends AppError {
  constructor(message: string = "Erro ao deletar o usuario") {
    super(message, 404, true)
  }
}
export class updateError extends AppError {
  constructor(message: string = "Erro ao atualizar o usuario") {
    super(message, 404, true)
  }
}
