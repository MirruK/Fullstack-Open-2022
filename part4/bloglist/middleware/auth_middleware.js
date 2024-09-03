export function tokenExtractor(request, response, next) {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
}

export function userExtractor(request, response, next) {}
