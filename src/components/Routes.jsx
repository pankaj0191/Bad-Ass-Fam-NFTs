import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { Gallery, About, Roadmap, Faq, Home, PageNotFound, Profile } from '.'

const Routes = () => {

	return (
		<ReactRoutes>
			<Route exact path='/' element={< Home />}></Route>
			<Route exact path='/gallery' element={< Gallery />}></Route>
			<Route exact path='/about' element={< About />}></Route>
			<Route exact path='/roadmap' element={< Roadmap />}></Route>
			<Route exact path='/faq' element={< Faq />}></Route>
			<Route exact path='/profile' element={< Profile />}></Route>
			<Route path='*' element={<PageNotFound />} />
		</ReactRoutes>
	);
}

export default Routes;