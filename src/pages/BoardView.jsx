import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Settings, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const mockLists = [
  {
    id: "list-1",
    title: "To Do",
    cards: [
      { id: "card-1", title: "Research competitors", description: "Analyze top 5 competitors" },
      { id: "card-2", title: "Design mockups", description: "Create initial design mockups for the homepage" },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      { id: "card-3", title: "Develop MVP", description: "Start working on the minimum viable product" },
    ],
  },
  {
    id: "list-3",
    title: "Done",
    cards: [
      { id: "card-4", title: "Project kickoff", description: "Initial team meeting and project setup" },
    ],
  },
];

const BoardView = () => {
  const { id } = useParams();
  const [lists, setLists] = useState(mockLists);

  const addNewList = () => {
    const newList = {
      id: `list-${Date.now()}`,
      title: "New List",
      cards: [],
    };
    setLists([...lists, newList]);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList = lists.find(list => list.id === source.droppableId);
    const destList = lists.find(list => list.id === destination.droppableId);
    const draggedCard = sourceList.cards.find(card => card.id === draggableId);

    const newLists = lists.map(list => {
      if (list.id === sourceList.id) {
        list.cards.splice(source.index, 1);
      }
      if (list.id === destList.id) {
        list.cards.splice(destination.index, 0, draggedCard);
      }
      return list;
    });

    setLists(newLists);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 pb-4">
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <Button onClick={addNewList} variant="outline" className="h-auto py-8 px-4">
            <Plus className="mr-2 h-4 w-4" /> Add New List
          </Button>
        </div>
      </DragDropContext>
    </div>
  );
};

const List = ({ list }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const addNewCard = () => {
    if (newCardTitle.trim() === "") return;
    const newCard = {
      id: `card-${Date.now()}`,
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
        <Droppable droppableId={list.id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-h-[50px]"
            >
              {list.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card className="p-2 mb-2">
                        <h3 className="font-semibold">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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