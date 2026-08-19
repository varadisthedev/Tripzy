function getStackLocation(stack) {
    if (!stack)
        return null;
    const stackLines = stack.split("\n").map((line) => line.trim());
    const frameLine = stackLines.find((line) => line.startsWith("at "));
    if (!frameLine)
        return null;
    const match = frameLine.match(/^at\s+(?:(.+?)\s+)?\(?(.+?):(\d+):(\d+)\)?$/);
    if (!match)
        return frameLine;
    const [, functionName, filePath, lineNumber, columnNumber] = match;
    const location = `${filePath}:${lineNumber}:${columnNumber}`;
    return functionName ? `${functionName} (${location})` : location;
}
export function errorMiddleware(error, req, res, _next) {
    const knownError = error;
    const statusCode = knownError.statusCode || knownError.status || 500;
    const message = knownError.message || "Unexpected server error.";
    const stackLocation = getStackLocation(knownError.stack);
    console.error({
        message,
        method: req.method,
        path: req.originalUrl,
        location: stackLocation,
        code: knownError.code,
        stack: knownError.stack,
    });
    res.status(statusCode).json({
        message,
        error: {
            method: req.method,
            path: req.originalUrl,
            location: stackLocation,
            code: knownError.code,
        },
    });
}
