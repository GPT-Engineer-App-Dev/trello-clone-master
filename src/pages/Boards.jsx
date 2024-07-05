import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const mockBoards = [
  { id: 1, name: "Project Alpha", description: "Main project board" },
  { id: 2, name: "Team Tasks", description: "Daily team tasks and updates" },
  { id: 3, name: "Roadmap", description: "Product roadmap and milestones" },
];

const Boards = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Boards</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Board
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBoards.map((board) => (
          <Link key={board.id} to={`/board/${board.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{board.name}</CardTitle>
                <CardDescription>{board.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* You can add a preview of lists or cards here */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Boards;