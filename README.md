# NK Project Webapp

A scalable Next.js application with React, TypeScript, Axios, React Query, and Shadcn/ui.

## 🚀 Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Axios** with interceptors for HTTP requests
- **React Query** for data fetching and caching
- **Shadcn/ui** for modern UI components
- **Tailwind CSS** for styling
- **Scalable Services & Hooks Architecture**

## 📁 Project Structure

```
src/
├── services/
│   ├── api/
│   │   ├── axios.ts           # Axios instance with interceptors
│   │   ├── endpoints.ts       # API endpoints configuration
│   │   ├── authService.ts     # Authentication service
│   │   └── postService.ts     # Example post service
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   └── index.ts               # Service exports
├── hooks/
│   ├── api/
│   │   ├── useAuth.ts         # Authentication hooks
│   │   └── usePosts.ts        # Post-related hooks
│   └── index.ts               # Hook exports
├── lib/
│   ├── react-query-provider.tsx  # React Query provider
│   └── utils.ts               # Utility functions (shadcn/ui)
└── components/
    └── ui/                    # Shadcn/ui components
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### API Configuration

Update the `API_BASE_URL` in `src/services/api/axios.ts` to match your API endpoint.

## 📚 Usage

### Services

Services are responsible for API communication:

```typescript
import { postService } from '@/src/services';

// Get posts
const posts = await postService.getPosts({ page: 1, limit: 10 });

// Create post
const newPost = await postService.createPost({
  title: 'My Post',
  content: 'Post content',
  tags: ['tag1'],
  status: 'published'
});
```

### React Query Hooks

Hooks provide a clean interface for data fetching:

```typescript
import { usePosts, useCreatePost } from '@/src/hooks';

function PostsComponent() {
  const { data: posts, isLoading, error } = usePosts({ page: 1, limit: 10 });
  const createPost = useCreatePost();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts?.data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Authentication

The auth system includes token management and interceptors:

```typescript
import { useAuth } from '@/src/hooks';

function AuthComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    await login({
      email: 'user@example.com',
      password: 'password123'
    });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Axios Interceptors

The axios instance includes automatic:

- **Token Management**: Automatically adds auth tokens to requests
- **Error Handling**: Handles common HTTP errors (401, 403, 404, 500)
- **Request Logging**: Logs requests and responses for debugging

## 🎯 Adding New Features

### 1. Create a New Service

```typescript
// src/services/api/userService.ts
import { apiClient, API_ENDPOINTS } from '../index';
import { User, CreateUserRequest } from '../types';

class UserService {
  async getUsers() {
    const response = await apiClient.get('/users');
    return response.data;
  }

  async createUser(data: CreateUserRequest) {
    const response = await apiClient.post('/users', data);
    return response.data;
  }
}

export const userService = new UserService();
```

### 2. Create React Query Hooks

```typescript
// src/hooks/api/useUsers.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from '../../services';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data) => userService.createUser(data),
  });
};
```

### 3. Export from Index Files

Update `src/services/index.ts` and `src/hooks/index.ts` to export new modules.

## 🧩 Components

The project uses Shadcn/ui components:

```typescript
import { Button, Card, Input, Label } from '@/components/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## 🔄 Data Flow

1. **Component** calls a **React Query Hook**
2. **Hook** uses a **Service** method
3. **Service** makes HTTP request with **Axios**
4. **Axios Interceptors** handle auth and errors
5. **React Query** caches and manages state
6. **Component** receives data and loading states

## 🛡️ Error Handling

- **Network Errors**: Logged and displayed to user
- **401 Unauthorized**: Token cleared, user redirected
- **403 Forbidden**: Permission error shown
- **404 Not Found**: Resource not found message
- **500 Server Error**: Server error message

## 📦 Dependencies

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `axios` - HTTP client
- `@tanstack/react-query` - Data fetching
- `typescript` - Type checking

### UI Dependencies
- `tailwindcss` - CSS framework
- `@radix-ui/*` - UI primitives
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes
- `lucide-react` - Icons

### Dev Dependencies
- `@types/*` - TypeScript definitions
- `eslint` - Code linting
- `postcss` - CSS processing

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

Ensure all environment variables are set in your production environment.

## 🤝 Contributing

1. Follow the existing code structure
2. Add TypeScript types for new features
3. Write tests for new functionality
4. Update documentation

## 📄 License

This project is licensed under the MIT License.
