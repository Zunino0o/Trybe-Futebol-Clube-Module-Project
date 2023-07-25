export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL':
      return 200;
    case 'INVALID_DATA':
      return 400;
    case 'UNAUTHORIZED':
      return 401;
    case 'NOT_FOUND':
      return 404;
    case 'CONFLICT':
      return 409;
    case 'UNPPROCESSABLE_ENTITY':
      return 422;
    default:
      return 500;
  }
}
