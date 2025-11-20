import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { quizBank } from '../../data/mockData';

const StudentQuizzesPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {quizBank.map((quiz) => (
        <Card key={quiz.id} className="space-y-3">
          <p className="text-xs font-semibold uppercase text-primary">Lesson quiz</p>
          <h3 className="text-2xl font-display">{quiz.title}</h3>
          <p className="text-sm text-stone-500">{quiz.questions.length} multiple choice questions.</p>
          <Button>Start quiz</Button>
        </Card>
      ))}
    </div>
  );
};

export default StudentQuizzesPage;

