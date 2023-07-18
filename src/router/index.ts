import { Request, Response, Router } from 'express';
import usersRoutes from './users.routes';

const router = Router();

export default (): Router => {
    usersRoutes(router);

	// root route
	router.get('/', (req: Request, res: Response) => {
		res.status(200).json({ message: 'Hallo, Welcome to my API !' });
	});

	return router;
};
