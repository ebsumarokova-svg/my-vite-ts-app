import { useQuery } from '@tanstack/react-query';
import { getBlogPosts, type BlogPost } from '../api/blogPosts';

export const BlogPostsPage_Elizabeth = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogPostsElizabeth'],
    queryFn: getBlogPosts,
  });

  if (isLoading) {
    return <h1>Загрузка постов...</h1>;
  }

  if (isError) {
    return <h1>Ошибка загрузки: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</h1>;
  }

  const posts = data?.data || [];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Список постов блога (Elizabeth)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {posts.map((post: BlogPost) => (
          <div 
            key={post.id} 
            style={{ 
              border: '1px solid #ccc', 
              padding: '16px', 
              borderRadius: '8px', 
              width: '300px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{post.title}</h3>
            <p><strong>Статус:</strong> {post.status}</p>
            <p><strong>Категория ID:</strong> {post.category?.id}</p>
            <p style={{ fontSize: '14px', color: '#666' }}>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};