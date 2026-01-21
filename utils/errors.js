// export const BadRequestError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 400;
//   }
// };

// export const NotFoundError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 404;
//   }
// };

// export const InternalServerError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 500;
//   }
// };

const InternalServerErrorMessage = "An error has occurred on the server.";

export default InternalServerErrorMessage;
