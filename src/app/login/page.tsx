'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth, useUser } from '@/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import GoogleIcon from '@/components/icons/google-icon';
import { Separator } from '@/components/ui/separator';
import { Loader2, Facebook } from 'lucide-react';
import Link from 'next/link';
import LineIcon from '@/components/icons/line-icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TermsDialog from './terms-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AnimateOnScroll from '@/components/animate-on-scroll';

const loginSchema = z.object({
  email: z.string().email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
  password: z.string().min(1, { message: 'กรุณากรอกรหัสผ่าน' }),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
  password: z.string().min(6, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['confirmPassword'],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;


export default function LoginPage() {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isUserLoading } = useUser();

  const [activeTab, setActiveTab] = useState('login');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const redirectUrl = searchParams.get('redirect') || '/account';

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push(redirectUrl);
    }
  }, [user, isUserLoading, router, redirectUrl]);
  
  // Forms
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const handleAuthError = (error: any) => {
    setIsAuthLoading(false);
    console.error("Authentication Error:", error);
    let title = 'เกิดข้อผิดพลาด';
    let description = 'กรุณาลองใหม่อีกครั้ง';

    switch (error.code) {
        case 'auth/user-not-found':
            description = 'ไม่พบผู้ใช้งานสำหรับอีเมลนี้';
            break;
        case 'auth/wrong-password':
            description = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
            break;
        case 'auth/email-already-in-use':
            description = 'อีเมลนี้ถูกใช้งานแล้ว ลองเข้าสู่ระบบแทน';
            break;
        case 'auth/weak-password':
            description = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
            break;
        case 'auth/invalid-email':
            description = 'รูปแบบอีเมลไม่ถูกต้อง';
            break;
        case 'auth/popup-closed-by-user':
            title = 'การเข้าสู่ระบบถูกยกเลิก';
            description = 'หน้าต่างสำหรับเข้าสู่ระบบถูกปิดก่อนดำเนินการเสร็จสิ้น';
            break;
        case 'auth/account-exists-with-different-credential':
            title = 'บัญชีมีอยู่แล้ว';
            description = 'มีบัญชีที่ใช้อีเมลนี้แต่เข้าสู่ระบบด้วยวิธีอื่นอยู่แล้ว';
            break;
        default:
            description = 'เกิดข้อผิดพลาดที่ไม่คาดคิด';
            break;
    }

    toast({
        variant: 'destructive',
        title: title,
        description: description,
    });
  };
  
  const onTermsAccept = () => {
    setHasAcceptedTerms(true);
    setIsTermsModalOpen(false);
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsAuthLoading(false);
    }
  };
  
  const onSignupSubmit = async (data: SignupFormValues) => {
      setIsAuthLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        toast({ title: 'สมัครสมาชิกสำเร็จ!', description: 'กำลังนำคุณไปยังบัญชีของคุณ...'});
      } catch (error) {
        handleAuthError(error);
      } finally {
        setIsAuthLoading(false);
      }
  };

  const handleSocialSignIn = async (providerName: 'google' | 'anonymous') => {
    setIsAuthLoading(true);
    try {
      if (providerName === 'google') {
        await signInWithPopup(auth, new GoogleAuthProvider());
      } else if (providerName === 'anonymous') {
        await signInAnonymously(auth);
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <>
    <TermsDialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen} onAccept={onTermsAccept} />
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background p-4">
      <AnimateOnScroll delay={100} as={Card} className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">ยินดีต้อนรับสู่ SAIFAH</CardTitle>
          <CardDescription>สร้างสรรค์ผลงานของคุณได้แล้ววันนี้</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">เข้าสู่ระบบ</TabsTrigger>
                    <TabsTrigger value="signup">สมัครสมาชิก</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="pt-6">
                     <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                             <FormField control={loginForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>อีเมล</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={loginForm.control} name="password" render={({ field }) => (
                                <FormItem><FormLabel>รหัสผ่าน</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={isAuthLoading || !hasAcceptedTerms}>
                                {isAuthLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                เข้าสู่ระบบ
                            </Button>
                        </form>
                    </Form>
                </TabsContent>

                <TabsContent value="signup" className="pt-6">
                    <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                             <FormField control={signupForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>อีเมล</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={signupForm.control} name="password" render={({ field }) => (
                                <FormItem><FormLabel>รหัสผ่าน</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={signupForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem><FormLabel>ยืนยันรหัสผ่าน</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={isAuthLoading || !hasAcceptedTerms}>
                                {isAuthLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                สร้างบัญชีใหม่
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
          
            <div className="!mt-4 flex items-start space-x-2.5">
                <Checkbox
                    id="terms"
                    checked={hasAcceptedTerms}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            setIsTermsModalOpen(true);
                        } else {
                            setHasAcceptedTerms(false);
                        }
                    }}
                    className="mt-0.5"
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        ฉันยอมรับ{' '}
                        <button type="button" onClick={(e) => { e.stopPropagation(); setIsTermsModalOpen(true); }} className="p-0 h-auto bg-transparent text-primary hover:text-primary/90 underline font-medium">
                            ข้อตกลงและเงื่อนไข
                        </button>
                    </label>
                    <p className="text-xs text-muted-foreground">
                        การดำเนินการต่อถือว่าคุณยอมรับนโยบายความเป็นส่วนตัวของเรา
                    </p>
                </div>
            </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                หรือ
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" onClick={() => handleSocialSignIn('google')} disabled={isAuthLoading || !hasAcceptedTerms}>
              {isAuthLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <GoogleIcon className="mr-2 h-4 w-4" />
              ดำเนินการต่อด้วย Google
            </Button>
          </div>
          
          <Button variant="link" onClick={() => handleSocialSignIn('anonymous')} className="w-full text-muted-foreground" disabled={isAuthLoading || !hasAcceptedTerms}>
             {isAuthLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            เข้าใช้งานแบบไม่ระบุตัวตน
          </Button>

          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
              <p className="font-semibold">หากลืมรหัสผ่าน?</p>
              <p>กรุณาติดต่อทีมงานเพื่อทำการรีเซ็ต</p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <Button variant="outline" size="sm" asChild>
                      <Link href="https://lin.ee/gxqYXSY" target="_blank">
                          <LineIcon className="mr-2 h-4 w-4" /> LINE
                      </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                      <Link href="https://www.facebook.com/saifahscreen" target="_blank">
                          <Facebook className="mr-2 h-4 w-4" /> Facebook
                      </Link>
                  </Button>
              </div>
          </div>

        </CardContent>
      </AnimateOnScroll>
    </div>
    </>
  );
}
