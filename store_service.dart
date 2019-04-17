


class StoreService {
	final StoreWebService webService;
	final StoreCacheService cacheService;

	List<Subscription> _subscriptions = <Subscription>[];
	
	StoreService({this.webService, this.cacheService}) {
		
	}
	
	dispose() {
    _subscriptions.forEach((subscription) {
      subscription.cancel();
    });
	}

  BehaviorSubject<List<Category>> getCategories$(int parentId) {
	  //TODO: send request only if freshtime is old
		webService.getCategories(parentId).then((cats) {
      cacheService.setCategories(cats);
    });
    return cacheService.getCategories$(parentId);
	}

  BehaviorSubject<List<Category>> getPopularCategories$() {
    //TODO: send request only if freshtime is old
    webService.getPopularCategories().then((cats) {
      cacheService.setPopularCategories(cats);
    });
    return cacheService.getPopularCategories$(parentId);
	}

  BehaviorSubject<Category> getCategory$(int id) {
    //TODO: send request only if freshtime is old
    webService.getCategory(id).then((cat) {
      cacheService.setCategory(cat);
    });
    return cacheService.getCategory$(id);
	}

  BehaviorSubject<List<Product>> getProducts$(int categoryId) {
    //TODO: send request only if freshtime is old
    webService.getProducts(categoryId).then((products) {
      cacheService.setProducts(products);
    });
    return cacheService.getProducts$(categoryId);
	}

  BehaviorSubject<List<Product>> getPopularProducts$() {
    //TODO: send request only if freshtime is old
    webService.getPopularProducts().then((products) {
      cacheService.setPopularProducts(products);
    });
    return cacheService.getPopularProducts$(categoryId);
	}

  BehaviorSubject<Product> getProduct$(int id) {
    //TODO: send request only if freshtime is old
    webService.getProduct(id).then((product) {
      cacheService.setProduct(product);
    });
    return cacheService.getProducts$(categoryId);
	}
}

abstract class StoreWebService {
  Future<List<Category>> getCategories(int parentId);
  Future<List<Category>> getPopularCategories();
  Future<Category> getCategory(int id);
  Future<List<Product>> getProducts(int categoryId);
  Future<List<Product>> getPopularProducts();
  Future<Product> getProduct(int id);
}

abstract class StoreCacheService {
  BehaviorSubject<List<Category>> getCategories$(int parentId);
  BehaviorSubject<List<Category>> getPopularCategories$();
  BehaviorSubject<Category> getCategory$(int id);
  BehaviorSubject<List<Product>> getProducts$(int categoryId);
  BehaviorSubject<List<Product>> getPopularProducts$();
  BehaviorSubject<Product> getProduct$(int id);
  void setCategories(List<Category> cats);
  void setPopularCategories(List<Category> cats);
  void setCategory(Category cat);
  void setProducts(List<Product> products);
  void setPopularProducts(List<Product> products);
  void setProduct(Product product);
}

class Category {
	int id;
	String name;
	String description;
	String image;
	int parentId;
	bool popular;
}

class Product {
	int id;
	String name;
	String description;
	String image;
	double price;
	int categoryId;
	bool popular;
}
