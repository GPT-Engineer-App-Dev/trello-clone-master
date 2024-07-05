import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Settings, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const mockLists = [
  {
    id: 1,
    title: "To Do",
    cards: [
      { id: 1, title: "Research competitors", description: "Analyze top 5 competitors" },
      { id: 2, title: "Design mockups", description: "Create initial design mockups for the homepage" },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    cards: [
      { id: 3, title: "Develop MVP", description: "Start working on the minimum viable product" },
    ],
  },
  {
    id: 3,
    title: "Done",
    cards: [
      { id: 4, title: "Project kickoff", description: "Initial team meeting and project setup" },
    ],
  },
];

const BoardView = () => {
  const { id } = useParams();
  const [lists, setLists] = useState(mockLists);

  const addNewList = () => {
    const newList = {
      id: Date.now(),
      title: "New List",
      cards: [],
    };
    setLists([...lists, newList]);
  };

  return (
    <div className="h-full overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Board {id}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 pb-4">
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
        <Button onClick={addNewList} variant="outline" className="h-auto py-8 px-4">
          <Plus className="mr-2 h-4 w-4" /> Add New List
        </Button>
      </div>
    </div>
  );
};

const List = ({ list }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const addNewCard = () => {
    if (newCardTitle.trim() === "") return;
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      description: "",
    };
    list.cards.push(newCard);
    setNewCardTitle("");
  };

  return (
    <Card className="w-72 shrink-0">
      <CardHeader>
        <CardTitle>{list.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {list.cards.map((card) => (
          <Card key={card.id} className="p-2">
            <h3 className="font-semibold">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </Card>
        ))}
        <div className="flex flex-col gap-2 mt-2">
          <Input
            placeholder="Enter card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <Button onClick={addNewCard}>
            <Plus className="mr-2 h-4 w-4" /> Add Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardView;