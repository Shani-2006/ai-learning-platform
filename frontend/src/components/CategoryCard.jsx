import "./CategoryCard.css";

function CategoryCard({ category, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-icon">📚</div>
      <h3>{category.name}</h3>
      <p>Explore lessons in {category.name}</p>
      <button>Start Learning</button>
    </div>
  );
}

export default CategoryCard;