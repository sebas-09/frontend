import React, { useEffect, useState } from "react";
import AdminService from "../../api-service/admin.service";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./adminOrders.css";

function AdminOrders() {
  const { getAllOrders, orders, isLoading, error } = AdminService();
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    getAllOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <>
      <Header />
      <div className="admin-orders-container">
        <h1>Gestión de Órdenes</h1>
        {isLoading && <p className="loading-message">Cargando...</p>}
        {error && <p className="error-message">Error al obtener las órdenes</p>}

        <ul className="orders-list">
          {orders.map((order) => (
            <li className="order-card" key={order.id}>
              <div className="order-summary">
                <h3>Pedido #{order.id}</h3>
                <p>
                  <strong>Cliente:</strong> {order.firstName} {order.lastName}
                </p>
                <p>
                  <strong>Teléfono:</strong> {order.phoneNo}
                </p>
                <p>
                  <strong>Dirección:</strong> {order.addressLine1},{" "}
                  {order.addressLine2}, {order.city}
                </p>
                <p>
                  <strong>Estado:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Pago:</strong> {order.paymentStatus}
                </p>
                <p>
                  <strong>Total:</strong> ${order.orderAmt.toFixed(2)}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.placedOn).toLocaleString()}
                </p>

                <button
                  className="toggle-btn"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  {expandedOrder === order.id
                    ? "Ocultar Productos"
                    : "Ver Productos"}
                </button>
              </div>

              {expandedOrder === order.id && (
                <div className="order-items">
                  <h4>Productos en la Orden</h4>
                  {order.orderItems.map((item) => (
                    <div className="order-item" key={item.productId}>
                      <img src={item.imageUrl} alt={item.productName} />
                      <div className="order-item-info">
                        <p>
                          <strong>{item.productName}</strong>
                        </p>
                        <p>Categoría: {item.categoryName}</p>
                        <p>Precio: ${item.price.toFixed(2)}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Total: ${item.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default AdminOrders;
