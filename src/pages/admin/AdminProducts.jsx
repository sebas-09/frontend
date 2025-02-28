import React, { useEffect, useState } from "react";
import AdminService from "../../api-service/admin.service";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./adminProducts.css";

function AdminProducts() {
  const {
    getAllProducts,
    getAllCategories,
    addProduct,
    editProduct,
    products,
    categories,
    isLoading,
    error,
  } = AdminService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    imageUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>?/gm, "").replace(/['";]/g, "");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: sanitizeInput(e.target.value),
    });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, categoryId: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName.trim() || !formData.price || !formData.description.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const productData = {
      productName: sanitizeInput(formData.productName.trim()),
      price: parseFloat(formData.price),
      description: sanitizeInput(formData.description.trim()),
      imageUrl: sanitizeInput(formData.imageUrl.trim()),
      categoryId: formData.categoryId,
    };

    try {
      if (isEditMode) {
        await editProduct(formData.id, productData);
      } else {
        await addProduct(productData);
      }

      setIsModalOpen(false);
      setFormData({ productName: "", price: "", description: "", imageUrl: "", categoryId: "" });
      getAllProducts();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      id: product.id,
      productName: product.productName,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />

      <div className="admin-products-container">
        <h1>Gestión de Productos</h1>
        {isLoading && <p className="loading-message">Cargando...</p>}
        {error && <p className="error-message">Error al obtener los productos</p>}

        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          Agregar Producto
        </button>

        <ul className="products-list">
          {products.map((prod) => (
            <li className="product-card" key={prod.id}>
              <img src={prod.imageUrl} alt={prod.productName} />
              <h3>{prod.productName}</h3>
              <p>Precio: ${prod.price.toFixed(2)}</p>
              <p>{prod.description}</p>
              <p><strong>Categoría:</strong> {prod.categoryName}</p>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEditClick(prod)}>
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditMode ? "Editar Producto" : "Agregar Producto"}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="productName"
                  placeholder="Nombre del producto"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Descripción"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="URL de la imagen"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
                <select name="categoryId" value={formData.categoryId} onChange={handleSelectChange} required>
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
                <div className="modal-actions">
                  <button type="submit" className="save-btn">
                    {isEditMode ? "Guardar Cambios" : "Agregar"}
                  </button>
                  <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default AdminProducts;
