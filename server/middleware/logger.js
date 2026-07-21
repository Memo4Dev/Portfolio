import morgan from 'morgan';

const logger = morgan(':method :url :status :response-time ms - :date[iso]', {
  skip: (req) => req.url === '/api/health',
});

export default logger;
