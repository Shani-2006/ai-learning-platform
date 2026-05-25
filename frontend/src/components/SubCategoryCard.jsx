import "./SubCategoryCard.css";

function SubCategoryCard({ subCategory, onClick }) {
  return (
    <div className="subcategory-card" onClick={onClick}>
      <div className="subcategory-icon">🧩</div>
      <h3>{subCategory.name}</h3>
      <p>Start a focused AI lesson about {subCategory.name}</p>
      <button>Open Lesson</button>
    </div>
  );
}

export default SubCategoryCard;