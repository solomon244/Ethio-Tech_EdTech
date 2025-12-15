import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaPlayCircle,
  FaShieldAlt,
  FaClock,
  FaBook,
  FaUser,
  FaStar,
  FaGraduationCap,
  FaUsers,
  FaTrophy,
  FaQuoteLeft,
  FaRocket,
} from 'react-icons/fa';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import { fetchCourses } from '../../services/courseService';
import type { Course, DashboardStat } from '../../types';

const valueProps = [
  {
    title: 'Localized Curriculum',
    description: 'Project-based lessons aligned with the Ethiopian senior secondary ICT stream.',
    icon: <FaShieldAlt className="text-primary" />,
    color: 'from-blue-500/10 to-blue-600/5',
  },
  {
    title: 'Instructor Mentorship',
    description: 'Weekly mentorship circles hosted by Ethiopian engineers across the diaspora.',
    icon: <FaPlayCircle className="text-primary" />,
    color: 'from-green-500/10 to-green-600/5',
  },
  {
    title: 'Career Pathways',
    description: 'Job shadowing, competitions, and university bridge programs to accelerate opportunity.',
    icon: <FaArrowRight className="text-primary" />,
    color: 'from-purple-500/10 to-purple-600/5',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Enroll in a Program',
    description: 'Choose from our curated selection of tech courses designed for Ethiopian students.',
    icon: <FaGraduationCap className="text-2xl text-primary" />,
  },
  {
    step: '02',
    title: 'Learn with Mentors',
    description: 'Get guidance from experienced Ethiopian engineers and tech professionals.',
    icon: <FaUsers className="text-2xl text-primary" />,
  },
  {
    step: '03',
    title: 'Build Real Projects',
    description: 'Apply your skills through hands-on projects that solve real-world problems.',
    icon: <FaRocket className="text-2xl text-primary" />,
  },
  {
    step: '04',
    title: 'Launch Your Career',
    description: 'Access job opportunities, competitions, and university bridge programs.',
    icon: <FaTrophy className="text-2xl text-primary" />,
  },
];

const testimonials = [
  {
    name: 'Alemitu Bekele',
    role: 'Student, Addis Ababa',
    content: 'This program transformed my understanding of programming. The mentorship from Ethiopian engineers made all the difference.',
    rating: 5,
  },
  {
    name: 'Yonas Tadesse',
    role: 'Graduate, Software Developer',
    content: 'The hands-on projects and real-world applications prepared me perfectly for my current role at a tech startup.',
    rating: 5,
  },
  {
    name: 'Meron Assefa',
    role: 'Student, Hawassa',
    content: 'The bilingual curriculum and localized content helped me grasp complex concepts much faster than traditional methods.',
    rating: 5,
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
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase text-primary animate-fade-in">
              Empowering Ethiopian innovators
            </p>
            <h1 className="section-heading text-4xl lg:text-6xl leading-tight">
              Build a future-ready tech career from the classroom.
            </h1>
            <p className="section-subheading text-lg lg:text-xl max-w-2xl">
              Ethio Tech Hub delivers bilingual programming bootcamps, project studios, and mentoring for
              secondary students in Addis Ababa and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="px-8 py-4 text-base shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/register">Join a cohort</Link>
              </Button>
              <Button asChild variant="secondary" className="px-8 py-4 text-base">
                <Link to="/courses">Browse programs</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 pt-4">
              {heroStats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </div>
          <Card className="flex-1 space-y-6 bg-gradient-to-br from-primary/5 via-white to-yellow-50 shadow-2xl overflow-hidden group">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80"
                alt="Ethiopian students collaborating"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="px-2">
              <Badge variant="success" className="mb-2">Spotlight Initiative</Badge>
              <h3 className="text-2xl font-display font-semibold text-stone-900">She Codes Addis</h3>
              <p className="mt-2 text-sm text-stone-600">
                250+ young women across 38 secondary schools build applications that tackle community challenges.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-stone-500 px-2">
              <div className="flex items-center gap-1">
                <FaTrophy className="text-yellow-500" />
                <span>+94% completion</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span>ICT Expo winners</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h2 className="section-heading">Featured programs</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Cohort-based experiences blending modern tooling with Ethiopian context.
            </p>
          </div>
          {courses.length > 0 && (
            <Button asChild variant="secondary" className="ml-4 hidden lg:flex">
              <Link to="/courses">View All →</Link>
            </Button>
          )}
        </div>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="space-y-4 animate-pulse">
                <div className="h-48 w-full rounded-2xl bg-stone-200" />
                <div className="h-4 w-3/4 bg-stone-200 rounded" />
                <div className="h-4 w-full bg-stone-200 rounded" />
                <div className="h-4 w-2/3 bg-stone-200 rounded" />
              </Card>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <Card className="text-center py-16">
            <div className="space-y-4">
              <p className="text-lg text-stone-500">No featured courses available yet.</p>
              <p className="text-sm text-stone-400">Check back soon for new programs!</p>
              <Button asChild variant="secondary" className="mt-4">
                <Link to="/courses">Browse All Courses</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => {
                const categoryName = typeof course.category === 'object' ? course.category.name : course.category;
                const instructorName = typeof course.instructor === 'object'
                  ? `${course.instructor.firstName} ${course.instructor.lastName}`
                  : 'Instructor';
                const courseId = course._id || course.id;
                
                return (
                  <Card 
                    key={courseId} 
                    className="group space-y-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Course Thumbnail */}
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={course.thumbnailUrl || '/placeholder-course.jpg'}
                        alt={course.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="success" className="bg-white/90 text-primary backdrop-blur-sm">
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Course Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="info" className="text-xs">
                          {categoryName}
                        </Badge>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {course.level}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-display font-semibold text-stone-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-sm text-stone-500 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center gap-4 text-xs text-stone-500 pt-2 border-t border-stone-100">
                        {course.totalLessons && (
                          <div className="flex items-center gap-1">
                            <FaBook className="text-primary" />
                            <span>{course.totalLessons} lessons</span>
                          </div>
                        )}
                        {course.totalDuration && (
                          <div className="flex items-center gap-1">
                            <FaClock className="text-primary" />
                            <span>{course.totalDuration}h</span>
                          </div>
                        )}
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 text-xs text-stone-600">
                        <FaUser className="text-primary" />
                        <span className="truncate">{instructorName}</span>
                      </div>

                      {/* Tags */}
                      {course.tags && course.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {course.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600"
                            >
                              #{tag}
                            </span>
                          ))}
                          {course.tags.length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                              +{course.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button 
                        asChild 
                        variant="primary" 
                        className="w-full mt-4 group-hover:bg-primary/90 transition-colors"
                      >
                        <Link to={`/courses/${courseId}`}>
                          View Program <FaArrowRight className="ml-2 inline" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {/* View All Button for Mobile */}
            {courses.length > 0 && (
              <div className="text-center mt-8 lg:hidden">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/courses">View All Programs →</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Value Propositions */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Why Choose Ethio Tech Hub</h2>
          <p className="section-subheading mx-auto max-w-2xl">
            We combine modern technology education with Ethiopian cultural context to create meaningful learning experiences.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((item) => (
            <Card 
              key={item.title} 
              className={`space-y-4 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${item.color}`}
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-stone-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Start your tech journey in four simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="space-y-4 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="info" className="text-xs font-bold">
                      {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">{step.title}</h3>
                  <p className="text-sm text-stone-500">{step.description}</p>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FaArrowRight className="text-primary/30 text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">What Students Say</h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Hear from students who have transformed their careers through our programs
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="space-y-4">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <div className="relative">
                <FaQuoteLeft className="text-primary/20 text-3xl mb-2" />
                <p className="text-sm text-stone-600 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <p className="font-semibold text-stone-900">{testimonial.name}</p>
                <p className="text-xs text-stone-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-yellow-50 rounded-3xl mx-auto max-w-6xl px-8 py-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Join hundreds of Ethiopian students building their future in technology. 
            Enroll today and take the first step towards a rewarding career.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="px-8 py-4 text-base shadow-lg">
              <Link to="/register">Get Started Now</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="px-8 py-4 text-base">
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


