const ErrorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  return res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}

export default ErrorHandler;