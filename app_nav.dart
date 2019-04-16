

enum AppNavigatorTypesEnum {
	root,
	mainTab,
	ticketTab,
	storeTab,
	profileTab
}

class AppNavigator {
	static AppNavigator _instance;
	List<List<String>> _history = [];
	List<BehaviorSubject<String>> _typeRoutes = [];
	
	const AppNavigator() {
		Status.values.forEach((v) {
			_history.add([]);
			_typeRoutes.add(new BehaviorSubject());
		});
	}
	
	getInstance() {
		if (_instance==null) {
			_instance = new AppNavigator();
		}
		return _instance;
	}
	
	static getRoute$(AppNavigatorTypesEnum type) {
		return AppNavigator.getInstance()._getRoute$(type);
	}
	
	static push(AppNavigatorTypesEnum type, String route) {
		AppNavigator.getInstance()._push(type, route);
	}
	
	static replace(AppNavigatorTypesEnum type, String route) {
		AppNavigator.getInstance()._replace(type, route);
	}
	
	static pop(AppNavigatorTypesEnum type) {
		return AppNavigator.getInstance()._pop(type);
	}
	
	static canPop(AppNavigatorTypesEnum type) {
		return AppNavigator.getInstance()._canPop(type);
	}
	
	_getRoute$(AppNavigatorTypesEnum type) {
		return _typeRoutes[type];
	}
	
	_push(AppNavigatorTypesEnum type, String route) {
		_history[type].add(route);
		_typeRoutes[type].add(route);
	}
	
	_pop(AppNavigatorTypesEnum type) {
		if (!_canPop(type) 
			throw new Exception("can't pop on empty list");
		var route = _history[type].pop();
		_typeRoutes[type].add(route);
		return route;
	}
	
	_canPop(AppNavigatorTypesEnum type) {
		return _history[type].length>0;
	}
	
	_replace(AppNavigatorTypesEnum type, String route) {
		if (_canPop(type) 
			_history[type].pop();
		_history[type].add(route);
		_typeRoutes[type].add(route);
	}
}
