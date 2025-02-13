import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Calendar,
  ClipboardList,
  DollarSign,
  Scissors,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Hair Biz - ปรับปรุงการจัดการร้านตัดผมของคุณ",
  description:
    "Hair Biz มอบโซลูชันที่ครบวงจรสำหรับการจัดการร้านตัดผม จัดตารางนัดหมาย จัดการลูกค้า และขยายธุรกิจของคุณด้วยแพลตฟอร์มที่ใช้งานง่ายและมีประสิทธิภาพ",
  keywords:
    "การจัดการร้านตัดผม, การจัดตารางนัดหมาย, การจัดการลูกค้า, ซอฟต์แวร์ร้านเสริมสวย, การเติบโตของธุรกิจร้านตัดผม",
};

const features = [
  {
    title: "การจัดตารางอัจฉริยะ",
    description: "จัดการนัดหมายได้อย่างง่ายดายด้วยระบบปฏิทินที่ใช้งานง่ายและมีประสิทธิภาพ",
    icon: Calendar,
  },
  {
    title: "ข้อมูลลูกค้าเชิงลึก",
    description:
      "เก็บบันทึกข้อมูลที่ละเอียดเกี่ยวกับความชอบและประวัติของลูกค้าเพื่อบริการที่เป็นส่วนตัวและตอบโจทย์",
    icon: Users,
  },
  {
    title: "การสนับสนุนหลายสถานที่",
    description:
      "จัดการร้านตัดผมหลายแห่งได้อย่างราบรื่นจากแดชบอร์ดเดียว ทำให้คุณควบคุมได้ง่าย",
    icon: Scissors,
  },
  {
    title: "การวิเคราะห์ธุรกิจ",
    description:
      "รับข้อมูลเชิงลึกที่มีค่าเกี่ยวกับประสิทธิภาพธุรกิจของคุณด้วยรายงานที่ละเอียดและเข้าใจง่าย",
    icon: TrendingUp,
  },
  {
    title: "การตั้งค่าที่ปรับแต่งได้",
    description:
      "ปรับแต่งระบบให้เหมาะกับความต้องการและกระบวนการทำงานเฉพาะของธุรกิจของคุณ",
    icon: Settings,
  },
  {
    title: "ราคาที่เหมาะสม",
    description: "เริ่มต้นฟรีและอัปเกรดเมื่อธุรกิจของคุณเติบโต โดยไม่มีค่าใช้จ่ายแอบแฝง",
    icon: DollarSign,
  },
];

const howItWorks = [
  {
    title: "ลงทะเบียน",
    description: "สร้างบัญชีฟรีของคุณและตั้งค่าโปรไฟล์ร้านตัดผมของคุณในไม่กี่นาที",
    icon: ClipboardList,
  },
  {
    title: "ปรับแต่ง",
    description:
      "ปรับแต่งระบบให้ตรงกับความต้องการของคุณ เพิ่มบริการและตั้งเวลาทำการได้ตามต้องการ",
    icon: Settings,
  },
  {
    title: "จัดการการจอง",
    description: "เริ่มรับและจัดการนัดหมายได้อย่างง่ายดายด้วยระบบที่ใช้งานง่าย",
    icon: Zap,
  },
  {
    title: "เติบโตธุรกิจของคุณ",
    description:
      "ใช้ข้อมูลเชิงลึกและการวิเคราะห์เพื่อทำการตัดสินใจที่ขับเคลื่อนด้วยข้อมูลและขยายธุรกิจของคุณ",
    icon: BarChart,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 sticky z-10 top-0 bg-background border-b">
        <div className="container flex justify-between items-center">
          <Link href="/" className="font-bold text-2xl text-primary">
            HairBiz
          </Link>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="#features">ฟีเจอร์</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="#how-it-works">วิธีใช้งาน</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">เข้าสู่ระบบ</Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link href="/auth/register">เริ่มต้นใช้งาน</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section className="py-40 relative container text-center space-y-4">
          <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            จัดการร้านตัดผมของคุณ
          </h2>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
            บริหารจัดการร้านตัดผมอย่างมีประสิทธิภาพ
          </p>
          <Button asChild size="lg">
            <Link href="/auth/register">เริ่มต้นใช้งาน</Link>
          </Button>
        </section>
        <section id="features" className="py-20 bg-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              ฟีเจอร์หลัก
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              วิธีใช้งาน
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              เริ่มต้นใช้งานง่าย ๆ
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              สมัครใช้งานฟรี แล้วลองสัมผัสประสบการณ์จัดการร้านตัดผมที่ง่ายขึ้น
            </p>
            <Button asChild size="lg">
              <Link href="/auth/register">สมัครใช้งานเลย</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Hair Biz</h3>
              <p className="text-sm text-gray-400">
                สนับสนุนช่างตัดผมและเจ้าของร้านเสริมสวยในการจัดการและเติบโตธุรกิจของพวกเขาอย่างง่ายดาย
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm hover:text-gray-300"
                  >
                    ฟีเจอร์
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm hover:text-gray-300"
                  >
                    วิธีใช้งาน
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-sm hover:text-gray-300"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="text-sm hover:text-gray-300"
                  >
                    ลงทะเบียน
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">กฎหมาย</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm hover:text-gray-300">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm hover:text-gray-300">
                    ข้อกำหนดในการให้บริการ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">© 2023 Hair Biz. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
