import { PolicyLayout } from "@/components/PolicyLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("問い合わせ", "問い合わせ窓口の準備状況を案内します。", "/contact/");

const formUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? "";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const validForm = /^https:\/\/(docs\.google\.com\/forms|forms\.gle)\//.test(formUrl);
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/example\./i.test(email);

export default function ContactPage() {
  const configured = validForm || validEmail;
  return (
    <PolicyLayout eyebrow="Contact" title="問い合わせ" lead={configured ? "公開用に設定された窓口からご連絡ください。" : "現在、問い合わせ窓口を準備しています。"}>
      {!configured ? (
        <div className="notice">
          <h2>問い合わせ先は未設定です</h2>
          <p>送信できないフォーム、送信ボタン、架空の連絡先は表示していません。</p>
        </div>
      ) : (
        <section>
          <h2>連絡方法</h2>
          {validForm && <p><a className="button primary" href={formUrl} target="_blank" rel="noopener noreferrer">外部フォームを開く</a></p>}
          {validEmail && <p><a className="button" href={`mailto:${email}`}>メールで問い合わせる</a></p>}
        </section>
      )}
      <section><h2>訂正について</h2><p>店舗・施設・イベントの更新や訂正依頼を受け付ける窓口も、公開用連絡先を設定した後に案内します。</p></section>
    </PolicyLayout>
  );
}
