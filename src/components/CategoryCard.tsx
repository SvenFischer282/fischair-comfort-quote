import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, description, image, link }: CategoryCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{description}</p>
        <Link to={link}>
          <Button variant="outline" className="w-full sm:w-auto group-hover:bg-primary group-hover:text-primary-foreground">
            Zistiť viac
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
