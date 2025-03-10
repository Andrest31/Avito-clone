import { useAuthModal } from "@/context/AuthModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AuthModal() {
  const { isOpen, close } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вход</DialogTitle>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}

function AuthForm() {
  return (
    <form className="space-y-4">
      <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
      <input type="password" placeholder="Пароль" className="w-full p-2 border rounded-md" />
      <Button className="w-full">Войти</Button>
    </form>
  );
}
