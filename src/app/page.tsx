import { CardDescription, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemTitle,
} from '@/components/ui/list';
import { Separator } from '@/components/ui/separator';

const algorithms = [
  {
    id: 1,
    name: 'Caesar Cipher',
    description: 'Encrypt your message using the Caesar cipher',
    link: '/ceasar-cipher',
  },
];

export default function HomePage() {
  return (
    <Container className="py-10">
      <div className="mb-5">
        <CardTitle>List of Algorithms</CardTitle>
        <CardDescription>
          A list of algorithms that are implemented in this project.
        </CardDescription>
        <Separator className="my-4" />
      </div>

      <List>
        {algorithms.map((algorithm) => (
          <ListItem key={algorithm.id} href={algorithm.link}>
            <ListItemTitle>
              <span>{algorithm.name}</span>
            </ListItemTitle>
            <ListItemDescription>{algorithm.description}</ListItemDescription>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
