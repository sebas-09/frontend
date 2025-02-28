import React, { useEffect, useState } from "react";
import AdminService from "../../api-service/admin.service";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./adminCategories.css"; // Importa el archivo CSS

function AdminCategories() {
  const {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    categories,
    isLoading,
    error,
  } = AdminService();

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    imageUrl: "",
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>?/gm, "").replace(/['";]/g, "");
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: sanitizeInput(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryName.trim() || !formData.description.trim()) {
      alert("El nombre y la descripción son obligatorios.");
      return;
    }

    const categoryData = {
      name: sanitizeInput(formData.categoryName.trim()),
      description: sanitizeInput(formData.description.trim()),
      imageUrl: sanitizeInput(formData.imageUrl.trim()),
    };

    try {
      if (editingCategory) {
        await editCategory(editingCategory.id, categoryData);
        setEditingCategory(null);
      } else {
        await createCategory(categoryData);
      }

      setIsModalOpen(false);
      await getAllCategories();
      setFormData({ categoryName: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      alert(`Error al guardar: ${error.message}`);
    }
  };

  const handleEditClick = (category) => {
    setFormData({
      categoryName: category.categoryName,
      description: category.description,
      imageUrl: category.imageUrl || "",
    });
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      await getAllCategories();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <>
      <Header /> {/* 🔹 Header presente en toda la página */}
      <div className="admin-categories-container">
        <h1>Gestión de Categorías</h1>
        {isLoading && <p className="loading-message">Cargando...</p>}
        {error && (
          <p className="error-message">Error al obtener las categorías</p>
        )}

        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          Crear Categoría
        </button>

        <ul className="category-list">
          {categories.map((cat) => (
            <li className="category-card" key={cat.id}>
              <h3>{cat.categoryName}</h3>
              <p>{cat.description}</p>
              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(cat)}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal del formulario */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>
                {editingCategory ? "Editar Categoría" : "Crear Categoría"}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Nombre de la categoría"
                  value={formData.categoryName}
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
                <div className="modal-actions">
                  <button type="submit" className="save-btn">
                    {editingCategory ? "Actualizar" : "Crear"}
                  </button>
                  <button
                    className="close-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer /> {/* 🔹 Footer presente en toda la página */}
    </>
  );
}

export default AdminCategories;
