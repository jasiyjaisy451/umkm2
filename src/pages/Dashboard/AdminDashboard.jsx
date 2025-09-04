import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadToCloudinary } from '../../services/cloudinary';
import ProductForm from '../../components/ProductForm/ProductForm';
import './Dashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0
  });

  useEffect(() => {
    fetchUsers();
    updateStats();
  }, [products]);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateStats = () => {
    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: 0 // This would come from orders collection
    });
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <p>Selamat datang, {currentUser?.displayName}!</p>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span className="nav-icon">👟</span>
              Kelola Produk
            </button>
            <button 
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <span className="nav-icon">👥</span>
              Kelola User
            </button>
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📦</span>
              Pesanan
            </button>
          </nav>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <section className="dashboard-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👟</div>
                  <div className="stat-info">
                    <h3>{stats.totalProducts}</h3>
                    <p>Total Produk</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>{stats.totalUsers}</h3>
                    <p>Total User</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Inquiry</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Aktivitas Terbaru</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">👟</span>
                    <div className="activity-content">
                      <p>Produk baru ditambahkan</p>
                      <span>2 jam yang lalu</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">👤</span>
                    <div className="activity-content">
                      <p>User baru mendaftar</p>
                      <span>5 jam yang lalu</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">📦</span>
                    <div className="activity-content">
                      <p>Inquiry baru diterima</p>
                      <span>1 hari yang lalu</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Kelola Produk</h2>
                <button 
                  className="add-btn"
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                >
                  + Tambah Produk
                </button>
              </div>

              {loading ? (
                <div className="loading">Memuat produk...</div>
              ) : (
                <div className="admin-products-grid">
                  {products.map((product, index) => (
                    <div key={product.id} className="admin-product-card">
                      <div className="product-image">
                        <img 
                          src={product.image || `https://images.pexels.com/photos/${1598505 + index}/pexels-photo-${1598505 + index}.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`} 
                          alt={product.name} 
                        />
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">{product.price}</p>
                      </div>
                      <div className="product-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <section className="dashboard-section">
              <h2>Kelola User</h2>
              <div className="users-table">
                <div className="table-header">
                  <span>Nama</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Tanggal Daftar</span>
                  <span>Aksi</span>
                </div>
                {users.map((user) => (
                  <div key={user.id} className="table-row">
                    <span>{user.displayName}</span>
                    <span>{user.email}</span>
                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                    <span>{new Date(user.createdAt).toLocaleDateString('id-ID')}</span>
                    <div className="table-actions">
                      {user.role !== 'admin' && (
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <section className="dashboard-section">
              <h2>Kelola Pesanan</h2>
              <div className="empty-state">
                <p>Fitur kelola pesanan akan segera hadir</p>
                <span>Saat ini semua pesanan melalui WhatsApp</span>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProductForm
              product={editingProduct}
              onSubmit={handleProductSubmit}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;