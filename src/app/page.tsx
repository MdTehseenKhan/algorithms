import { CardDescription, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import {
  List,
  ListHeader,
  ListItem,
  ListItemDescription,
  ListItemTitle,
} from '@/components/ui/list';
import { Separator } from '@/components/ui/separator';

const algorithms = [
  {
    id: 1,
    name: 'Caesar Cipher',
    description: 'Encrypt/Decrypt your message using the Caesar cipher',
    link: '/cipher/ceasar-cipher',
  },
  {
    id: 2,
    name: 'Vigenere Cipher',
    description: 'Encode/Decode your message using the Vigenere cipher',
    link: '/cipher/vigenere-cipher',
  },
  {
    id: 3,
    name: 'Poly-Alpha Cipher',
    description: 'Encode/Decode your message using the Poly-Alpha cipher',
    link: '/cipher/poly-alpha-cipher',
  },
  {
    id: 4,
    name: 'One-Time Pad Cipher',
    description: 'Encode/Decode your message using the One-Time Pad cipher',
    link: '/cipher/otp-cipher',
  },
  {
    id: 5,
    name: 'Playfair Cipher',
    description: 'Encode/Decode your message using the Playfair cipher',
    link: '/cipher/playfair-cipher',
  },
];

export default function HomePage() {
  return (
    <Container>
      <div className="mb-5">
        <CardTitle>List of Algorithms</CardTitle>
        <CardDescription>
          A list of algorithms that are implemented in this project.
        </CardDescription>
        <Separator className="my-4" />
      </div>

      <List>
        <ListHeader>Substitution Ciphers</ListHeader>
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
