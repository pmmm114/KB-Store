import { CardSelectionSection } from '../../widgets/CardSelectionSection/ui/CardSelectionSection';

import { analyzeTarot } from './actions';

import styles from './page.module.css';

export default function TarotPage() {
  return (
    <main className={styles.tarotePage}>
      <section className={styles.scrollableFanCardSection}>
        <CardSelectionSection onComplete={analyzeTarot} />
      </section>
    </main>
  );
}
