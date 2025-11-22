import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import SelectField from '../../components/common/SelectField';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { fetchCourses } from '../../services/courseService';
import { fetchCategories } from '../../services/categoryService';
import type { Course, Category } from '../../types';

const levelOptions = [
  { label: 'All levels', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

const CoursesPage = () => {
  const [level, setLevel] = useState('all');
  const [category, setCategory] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [coursesData, categoriesData] = await Promise.all([
          fetchCourses({ isPublished: true }),
          fetchCategories(),
        ]);
        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const categoryOptions = [
    { label: 'All categories', value: 'all' },
    ...categories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })),
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const levelMatch = level === 'all' || course.level === level;
      const categoryMatch = category === 'all' || course.category === category;
      return levelMatch && categoryMatch;
    });
  }, [courses, level, category]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm font-semibold text-stone-500">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm font-semibold text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <header className="space-y-4 text-center">
        <h1 className="section-heading">Explore live and on-demand programs</h1>
        <p className="section-subheading mx-auto">
          Choose pathways spanning full-stack engineering, AI, product design, and entrepreneurship.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SelectField label="Category" value={category} onChange={(event) => setCategory(event.target.value)} options={categoryOptions} />
        <SelectField label="Level" value={level} onChange={(event) => setLevel(event.target.value)} options={levelOptions} />
        <SelectField
          label="Duration"
          options={[
            { label: 'Any length', value: 'any' },
            { label: 'Less than 10h', value: 'short' },
            { label: '10h - 20h', value: 'medium' },
            { label: '20h+', value: 'long' },
          ]}
        />
        <SelectField
          label="Language"
          options={[
            { label: 'English & Amharic', value: 'bilingual' },
            { label: 'English only', value: 'english' },
            { label: 'Amharic only', value: 'amharic' },
          ]}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <p className="text-sm font-semibold text-stone-500">No courses found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="space-y-4">
              <img
                src={course.thumbnailUrl || 'https://via.placeholder.com/400x200'}
                alt={course.title}
                className="h-48 w-full rounded-2xl object-cover"
              />
              <div className="flex flex-wrap gap-3">
                <Badge variant="info">
                  {typeof course.category === 'string' ? course.category : categories.find((c) => c.id === course.category)?.name || 'Uncategorized'}
                </Badge>
                <Badge variant="success">{course.level}</Badge>
              </div>
              <h2 className="text-2xl font-display font-semibold text-stone-900">{course.title}</h2>
              <p className="text-sm text-stone-500">{course.description}</p>
              <div className="grid grid-cols-3 gap-4 text-center text-sm font-semibold text-stone-600">
                <div>
                  <p className="text-2xl font-display text-stone-900">{course.stats?.lessons || 0}</p>
                  <p>Lessons</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-stone-900">{course.stats?.duration || 'N/A'}</p>
                  <p>Duration</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-stone-900">{course.stats?.students || 0}</p>
                  <p>Learners</p>
                </div>
              </div>
              <Button asChild fullWidth className="py-3 text-base">
                <Link to={`/courses/${course.id}`}>See details</Link>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;


