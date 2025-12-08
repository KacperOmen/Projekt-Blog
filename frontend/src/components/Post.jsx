import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 mb-6">
      <div className="flex flex-col md:flex-row">
        
        <Link 
          to={`/post/${_id}`} 
          className="md:w-1/3 w-full h-56 md:h-auto overflow-hidden"
        >
          <img 
            src={`http://localhost:3000/${cover}`} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
          
          <div>
            <Link to={`/post/${_id}`}>
              <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                {title}
              </h2>
            </Link>

            <p className="text-gray-500 text-sm mt-2">
              Autor: <span className="font-medium">{author.username}</span> •{" "}
              {format(createdAt, "d MMMM yyyy HH:mm", { locale: pl })}
            </p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              {summary}
            </p>
          </div>

        </div>
      </div>
    </article>
  );
};

export default Post;
