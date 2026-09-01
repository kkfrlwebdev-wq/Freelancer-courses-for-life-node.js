export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  if (req.accepts(["html", "json"]) === "json") {
    return res.status(status).json({ error: message });
  }

  return res.status(status).render("error", {
    message,
    error: req.app.get("env") === "development" ? err : { status },
  });
}
