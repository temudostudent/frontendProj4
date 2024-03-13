import React, { useState , useEffect } from 'react'
import Table from '../Components/CommonElements/Table'
import AuthService from '../Components/Service/AuthService'
import { userStore } from '../Stores/UserStore'
import { toast } from 'react-toastify'

const Categories = () => {

    const token = userStore((state) => state.token);
    const [categoriesData ,setCategoriesData] = useState([]);
    const [selected , setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleCategorySelectionChange = (selectedCategoryIds) => {
        setSelected(selectedCategoryIds);
      };

    useEffect(() => {
        
        fetchCategories();
      }, [token, categoriesData]);

    const fetchCategories = async () => {
      try {
        const allCategories = await AuthService.getAllCategories(token);
        setCategoriesData(allCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


    const handleNewCategorySubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await AuthService.newCategory(token, { name: newCategoryName });
            
            if (response.status === 201) {
                // Limpar o campo de entrada
                setNewCategoryName('');
                // Atualizar a lista de categorias
                const updatedCategories = await AuthService.getAllCategories(token);
                setCategoriesData(updatedCategories);
            }
        } catch (error) {
            console.error('Error creating new category:', error);
        }
    };

    const handleDeleteSelectedCategories = async () => {
        try {
          const deletedCategories = await Promise.all(
            selected.map(async (categoryId) => {
              const response = await AuthService.deleteCategory(token, categoryId);
            })
          );
      
          await fetchCategories();

            } catch (error) {
            console.error('Error deleting categories:', error);
            }
      };

    const handleChangeAddCategory  = () => {
      setIsFormVisible(!isFormVisible);
      console.log('clique');
    };


    return (
        <div className='categories'>
          <div className={`container-addCategoriesForm ${isFormVisible ? 'form-visible' : ''}`}>
            <form onSubmit={handleNewCategorySubmit}>
                <input
                    type="text"
                    placeholder="New category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button type="submit">Add Category</button>
            </form>
          </div>
            <div className='categories-table-container'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <Table 
                            data={categoriesData} 
                            onDeleteSelectedCategories={handleDeleteSelectedCategories}
                            onCategorySelectionChange={handleCategorySelectionChange}
                            onAddCategoryChange={handleChangeAddCategory}
                            />
                    </>
                )}
            </div>
        </div>
    );
};

export default Categories;