import { Trash } from "lucide-react";
import { Button } from "./button";

export const DefaultButton = () => <Button>Button</Button>;

export const DestructiveButton = () => (
  <Button variant="destructive">Button</Button>
);

export const OutlineButton = () => <Button variant="outline">Button</Button>;

export const SecondaryButton = () => (
  <Button variant="secondary">Button</Button>
);

export const GhostButton = () => <Button variant="ghost">Button</Button>;

export const LinkButton = () => <Button variant="link">Button</Button>;

export const LoadingButton = () => <Button loading>Button</Button>;

export const LoadingIconButton = () => (
  <Button loading size="icon">
    <Trash />
  </Button>
);
