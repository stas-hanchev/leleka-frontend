"use client";

// import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";
// import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";
// import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";
import styles from "./FeelingCard.module.css";
// import { useNoteModalStore } from "@/lib/store/modalNoteStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function FeelingCard() {
  //   const { isOpen, openNoteModal, closeNoteModal } = useNoteModalStore();
  //   const selectedNote = useSelectedNoteStore((s) => s.selectedNote);
  const { user } = useAuthStore();
  const router = useRouter();

  const handleBtnClick = () => {
    if (!user) {
      router.push("/auth/register");
      // } else openNoteModal();
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Як ви себе почуваєте?</h3>
      <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
      <p className={styles.text}>Занотуйте незвичні відчуття у тілі.</p>
      <button className={styles.button} onClick={handleBtnClick}>
        Зробити запис у щоденник
      </button>
      {/* {isOpen && (
        <AddDiaryEntryModal
          onClose={() => {
            closeNoteModal();
            useSelectedNoteStore.getState().setSelectedNote(null);
          }}
        >
          <AddDiaryEntryForm editingNote={selectedNote ?? null} />
        </AddDiaryEntryModal>
      )} */}
    </div>
  );
}
