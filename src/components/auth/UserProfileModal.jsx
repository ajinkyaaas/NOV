import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  Sparkles,
  CheckCircle,
  Clock,
  Truck,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const UserProfileModal = () => {
  const {
    isProfileModalOpen,
    closeProfileModal,
    profileActiveTab,
    setProfileActiveTab,
    user,
    orders,
    logout,
    updateProfile,
    openOrderTracking,
    currency
  } = useShop();

  if (!isProfileModalOpen || !user) return null;

  // Profile Edit Form State
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');

  // Address Form State
  const [street, setStreet] = useState(user.address?.street || '');
  const [city, setCity] = useState(user.address?.city || '');
  const [state, setState] = useState(user.address?.state || '');
  const [zip, setZip] = useState(user.address?.zip || '');
  const [country, setCountry] = useState(user.address?.country || 'United States');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    updateProfile({
      address: {
        fullName: name,
        street,
        city,
        state,
        zip,
        country
      }
    });
  };

  return (
    <div className="modal-overlay" onClick={closeProfileModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '840px',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Header with Close */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{user.name}</h2>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                  {user.membership || 'VIP Customer'}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{user.email}</p>
            </div>
          </div>

          <button onClick={closeProfileModal} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '440px' }}>
          {/* Left Navigation Sidebar */}
          <div style={{ background: 'var(--bg-tertiary)', borderRight: '1px solid var(--border-subtle)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { id: 'profile', label: 'Profile Details', icon: User },
                { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
                { id: 'addresses', label: 'Shipping Address', icon: MapPin }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = profileActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setProfileActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--bg-card-hover)' : 'transparent',
                      border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.75rem 0' }} />

              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-rose)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div style={{ padding: '2rem', background: 'var(--bg-secondary)', overflowY: 'auto', maxHeight: '520px' }}>
            {/* Tab 1: Profile Details */}
            {profileActiveTab === 'profile' && (
              <form onSubmit={handleSaveProfile}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Personal Information</h3>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0', padding: '0.75rem 1rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-highlight)' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Your data is secured with end-to-end 256-bit encryption.
                  </span>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* Tab 2: Orders History */}
            {profileActiveTab === 'orders' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Order History & Live Tracking</h3>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    <Package size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                    <p>No orders placed yet. Explore the showcase to place your first order!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'monospace' }}>
                              #{order.id}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                              {order.date}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span
                              className={`badge ${order.status === 'Delivered' ? 'badge-emerald' : 'badge-gold'}`}
                              style={{ fontSize: '0.72rem' }}
                            >
                              {order.status}
                            </span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                              {formatPrice(order.total, currency)}
                            </span>
                          </div>
                        </div>

                        {/* Item list */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflowX: 'auto', marginBottom: '0.85rem' }}>
                          {order.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)' }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }}
                              />
                              <div style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                                <div style={{ fontWeight: 600 }}>{item.name.substring(0, 24)}...</div>
                                <div style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity} • {item.color}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Track button */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                            Tracking: {order.trackingNumber}
                          </span>
                          <button
                            onClick={() => {
                              openOrderTracking(order);
                              closeProfileModal();
                            }}
                            className="btn btn-secondary"
                            style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', borderRadius: 'var(--radius-sm)' }}
                          >
                            <Truck size={13} style={{ color: 'var(--accent-primary)' }} />
                            <span>Track Timeline</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Shipping Addresses */}
            {profileActiveTab === 'addresses' && (
              <form onSubmit={handleSaveAddress}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Default Delivery Address</h3>

                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="form-input"
                    placeholder="e.g. 742 Evergreen Terrace"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-input"
                      placeholder="e.g. San Francisco"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="form-input"
                      placeholder="e.g. CA"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Postal / ZIP Code</label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="form-input"
                      placeholder="e.g. 94105"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>
                  Update Address
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
