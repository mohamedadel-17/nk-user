# شرح استخدام الـ API Hooks والـ Services

ده دليل شامل لطريقة استخدام نظام الـ API والـ Hooks في مشروعك.

## البنية الأساسية

```
src/
├── services/
│   ├── api/
│   │   ├── axios.ts           # إعدادات الاتصال بالـ API
│   │   ├── authService.ts     # خدمات المصادقة
│   │   ├── postService.ts     # خدمات المقالات
│   │   ├── productService.ts  # خدمات المنتجات (جديد)
│   │   └── endpoints.ts       # عناوين الـ API
│   ├── types/
│   │   └── index.ts           # تعريف الـ Types
│   └── index.ts               # تصدير جميع الخدمات
├── hooks/
│   └── api/
│       ├── useAuth.ts         # Hooks للمصادقة
│       └── useProducts.ts     # Hooks للمنتجات (جديد)
└── components/
    └── examples/
        └── ProductManagementExample.tsx  # مثال عملي
```

## طريقة الاستخدام

### 1. استخدام خدمات المصادقة (Authentication)

```typescript
import { useAuth } from '../hooks/api/useAuth';

function MyComponent() {
  const { 
    user, 
    login, 
    loginLoading, 
    logout, 
    isAuthenticated 
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      console.log('تم تسجيل الدخول بنجاح');
    } catch (error) {
      console.error('فشل تسجيل الدخول:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>أهلاً {user?.name}</p>
          <button onClick={() => logout()}>تسجيل خروج</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={loginLoading}>
          {loginLoading ? 'جاري تسجيل الدخول...' : 'تسجيل دخول'}
        </button>
      )}
    </div>
  );
}
```

### 2. استخدام خدمات المنتجات (Products)

```typescript
import { useProductsManager, useProduct } from '../hooks/api/useProducts';

function ProductsPage() {
  const {
    products,
    productsLoading,
    createProduct,
    deleteProduct,
    updateStock,
  } = useProductsManager({ page: 1, limit: 10 });

  if (productsLoading) return <div>جاري التحميل...</div>;

  const handleAddProduct = async () => {
    try {
      await createProduct({
        name: 'منتج جديد',
        description: 'وصف المنتج',
        price: 100,
        categoryId: 'cat-1',
        sku: 'PROD-001',
        stock: 50,
        images: [],
      });
    } catch (error) {
      console.error('فشل إضافة المنتج:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAddProduct}>إضافة منتج</button>
      
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>السعر: {product.price}</p>
          <p>المخزون: {product.stock}</p>
          <button onClick={() => deleteProduct(product.id)}>حذف</button>
          <button onClick={() => updateStock({ id: product.id, stock: product.stock + 1 })}>
            زيادة المخزون
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 3. البحث والتصفية

```typescript
import { useProductSearch, useProductsByCategory } from '../hooks/api/useProducts';

function SearchExample() {
  const searchResults = useProductSearch('لابتوب', { limit: 5 });
  const categoryProducts = useProductsByCategory('electronics', { page: 1 });

  return (
    <div>
      <h2>نتائج البحث:</h2>
      {searchResults.data?.data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      
      <h2>منتجات فئة الإلكترونيات:</h2>
      {categoryProducts.data?.data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## إضافة خدمة جديدة

### الخطوة 1: تعريف الـ Types

```typescript
// في services/types/index.ts
export interface MyNewType {
  id: string;
  name: string;
  // ... باقي الخصائص
}

export interface CreateMyNewTypeRequest {
  name: string;
  // ... باقي الخصائص
}
```

### الخطوة 2: إضافة الـ Endpoints

```typescript
// في services/api/endpoints.ts
export const API_ENDPOINTS = {
  // ... الـ Endpoints الحالية
  
  MY_NEW_TYPE: {
    LIST: '/my-new-types',
    DETAIL: (id: string) => `/my-new-types/${id}`,
    CREATE: '/my-new-types',
    UPDATE: (id: string) => `/my-new-types/${id}`,
    DELETE: (id: string) => `/my-new-types/${id}`,
  },
};
```

### الخطوة 3: إنشاء الـ Service

```typescript
// في services/api/myNewTypeService.ts
import { apiClient, API_ENDPOINTS } from '../index';
import { MyNewType, CreateMyNewTypeRequest } from '../types';

class MyNewTypeService {
  async getAll(): Promise<ApiResponse<MyNewType[]>> {
    const response = await apiClient.get<ApiResponse<MyNewType[]>>(API_ENDPOINTS.MY_NEW_TYPE.LIST);
    return response.data;
  }

  async getById(id: string): Promise<ApiResponse<MyNewType>> {
    const response = await apiClient.get<ApiResponse<MyNewType>>(API_ENDPOINTS.MY_NEW_TYPE.DETAIL(id));
    return response.data;
  }

  async create(data: CreateMyNewTypeRequest): Promise<ApiResponse<MyNewType>> {
    const response = await apiClient.post<ApiResponse<MyNewType>>(API_ENDPOINTS.MY_NEW_TYPE.CREATE, data);
    return response.data;
  }

  // ... باقي الدوال
}

export const myNewTypeService = new MyNewTypeService();
```

### الخطوة 4: تصدير الـ Service

```typescript
// في services/index.ts
export { myNewTypeService } from './api/myNewTypeService';
```

### الخطوة 5: إنشاء الـ Hooks

```typescript
// في hooks/api/useMyNewType.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { myNewTypeService } from '../../services';

export const useMyNewTypes = () => {
  return useQuery({
    queryKey: ['my-new-types'],
    queryFn: () => myNewTypeService.getAll(),
  });
};

export const useCreateMyNewType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => myNewTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-new-types'] });
    },
  });
};
```

## مميزات النظام

1. **Type Safety**: كل حاجة typed بشكل كامل
2. **Caching**: تلقائي بفضل React Query
3. **Error Handling**: مركزي في الـ Interceptors
4. **Loading States**: مدمج في الـ Hooks
5. **Pagination**: مدعوم بشكل كامل
6. **Cache Invalidation**: تلقائي بعد الـ Mutations
7. **Retry Logic**: مدمج للتعامل مع الأخطاء

## نصائح هامة

- دايمًا استخدم الـ Keys المنظمة في الـ Query Keys
- استخدم `staleTime` و `gcTime` للتحكم في الـ Caching
- عامل الـ Errors في الـ onError callbacks
- استخدم `enabled` parameter لل conditional queries
- دايمًا `invalidateQueries` بعد الـ Mutations
- استخدم الـ Types بشكل صحيح لتجنب الأخطاء

## أمثلة عملية

شوف الملف `src/components/examples/ProductManagementExample.tsx` لمثال عملي كامل يوضح كل المميزات.
