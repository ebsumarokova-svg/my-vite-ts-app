import { useState, useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { getUsers, type User } from './api/users';
import { getBlogPosts, type BlogPost } from './api/blogPosts';
import { BlogPostsPage_Elizabeth } from './pages/BlogPostsPage_Elizabeth';
import './App.css';

const DUMMY_PICTURE = 'https://thumbs.dreamstime.com/b/none-102846161.jpg?w=768';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadUserList = () => {
    setLoading(true);
    getUsers().then((userList) => {
      if (userList) {
        setTimeout(() => setUsers(userList.data), 1000);
      }
    }).finally(() => setLoading(false));
  };

  const loadPostList = () => {
    setLoading(true);
    getBlogPosts().then((postList) => {
      if (postList) {
        setTimeout(() => setPosts(postList.data), 1000);
      }
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUserList();
    loadPostList();
  }, []);

  return (
    <>
      <nav style={{ padding: '16px', display: 'flex', gap: '16px', borderBottom: '1px solid #ccc' }}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Главная (Users & Posts)
        </NavLink>
        <NavLink to="/blog-posts-elizabeth" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Посты блога (React Query)
        </NavLink>
      </nav>

      <Routes>
        <Route path="/blog-posts-elizabeth" element={<BlogPostsPage_Elizabeth />} />

        <Route path="/" element={
          <section id="center" style={{ padding: '20px' }}>
            <div>
              <h1>Users list</h1>
              <h1>Blog posts list</h1>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <button type="button" className="counter" onClick={loadUserList}>
                Update user list
              </button>
              <button type="button" className="counter" onClick={loadPostList} style={{ marginLeft: '10px' }}>
                Update post list
              </button>
            </div>
            
            <div className="usersContainer">
              {loading && <h1>Loading...</h1>}
              {!loading && (
                <>
                  <h2>Users</h2>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {users.map((user) => (
                      <div key={user.id} className="userCard" style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <div>{user.firstName} {user.lastName}</div>
                        <div>
                          {user.avatar?.map((avt) => (
                            <img key={avt.uid} height={100} width={100} src={DUMMY_PICTURE} alt="avatar" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2>Posts</h2>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {posts.map((post) => (
                      <div key={post.id} className="userCard" style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <div><b>{post.title}</b></div>
                        <div>Status: {post.status}</div>
                        <div>Category id: {post.category?.id}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        } />
      </Routes>
    </>
  );
}

export default App;