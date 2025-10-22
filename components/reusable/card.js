export default function Card({ children }) {
  return (
    <div className="bg-background shadow-md rounded-lg p-6">
      {children}
    </div>
  );
}