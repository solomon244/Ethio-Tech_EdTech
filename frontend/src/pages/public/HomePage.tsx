import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlayCircle, FaShieldAlt } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { fetchCourses } from '../../services/courseService';
import type { Course, DashboardStat } from '../../types';

const valueProps = [
  {
    title: 'Localized Curriculum',
    description: 'Project-based lessons aligned with the Ethiopian senior secondary ICT stream.',
    icon: <FaShieldAlt className="text-primary" />,
  },
  {
    title: 'Instructor Mentorship',
    description: 'Weekly mentorship circles hosted by Ethiopian engineers across the diaspora.',
    icon: <FaPlayCircle className="text-primary" />,
  },
  {
    title: 'Career Pathways',
    description: 'Job shadowing, competitions, and university bridge programs to accelerate opportunity.',
    icon: <FaArrowRight className="text-primary" />,
  },
];

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses({ isPublished: true });
        setCourses(data.slice(0, 4)); // Show only first 4 featured courses
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const heroStats: DashboardStat[] = [
    {
      id: '1',
      label: 'Active Students',
      value: '1,200+',
      trend: 'up',
    },
    {
      id: '2',
      label: 'Courses Available',
      value: courses.length,
      trend: 'up',
    },
    {
      id: '3',
      label: 'Completion Rate',
      value: '94%',
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-20 py-12">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase text-primary">
            Empowering Ethiopian innovators
          </p>
          <h1 className="section-heading text-4xl lg:text-5xl">
            Build a future-ready tech career from the classroom.
          </h1>
          <p className="section-subheading text-lg">
            Ethio Tech Hub delivers bilingual programming bootcamps, project studios, and mentoring for
            secondary students in Addis Ababa and beyond.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="px-6 py-3 text-base">
              <Link to="/register">Join a cohort</Link>
            </Button>
            <Button asChild variant="secondary" className="px-6 py-3 text-base">
              <Link to="/courses">Browse programs</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
        <Card className="flex-1 space-y-6 bg-gradient-to-br from-primary/5 via-white to-yellow-50 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80"
            alt="Ethiopian students collaborating"
            className="h-72 w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Spotlight Initiative</p>
            <h3 className="mt-1 text-2xl font-display font-semibold">She Codes Addis</h3>
            <p className="mt-2 text-sm text-stone-600">
              250+ young women across 38 secondary schools build applications that tackle community challenges.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span>+94% course completion</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            <span>National ICT Expo winners</span>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="section-heading">Featured programs</h2>
          <p className="section-subheading mx-auto">
            Cohort-based experiences blending modern tooling with Ethiopian context.
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12">Loading featured courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No courses available yet.</div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {courses.map((course) => {
              const categoryName = typeof course.category === 'object' ? course.category.name : course.category;
              return (
                <Card key={course._id || course.id} className="space-y-5">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <img
                      src={course.thumbnailUrl || '/placeholder-course.jpg'}
                      alt={course.title}
                      className="h-52 w-full rounded-2xl object-cover md:h-40 md:w-56"
                    />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <span>{categoryName}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                        <span className="capitalize">{course.level}</span>
                      </div>
                      <h3 className="text-2xl font-display font-semibold text-stone-900">{course.title}</h3>
                      <p className="text-sm text-stone-500">{course.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs font-semibold text-stone-500">
                        {course.tags?.map((tag) => (
                          <span key={tag} className="rounded-full bg-stone-100 px-3 py-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Button asChild className="px-4 py-2 text-sm">
                        <Link to={`/courses/${course._id || course.id}`}>View program</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((item) => (
            <Card key={item.title} className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
              <p className="text-sm text-stone-500">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;


