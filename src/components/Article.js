import React, { useRef } from "react";
import { Dialog, DialogOverlay } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import ArticleModal from "./ArticleModal";

function Article({ showDialog, closeModal, article }) {
  let cardRef = useRef();
  return (
    <div ref={cardRef}>
      <DialogOverlay
        className="dialog_overlay"
        isOpen={showDialog}
        onDismiss={closeModal}
      >
        <Dialog isOpen={showDialog} onDismiss={closeModal}>
          <div className="modal_btn_wrapper">
            <button className="close-button" onClick={closeModal}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>×</span>
            </button>
          </div>
          <ArticleModal article={article} />
        </Dialog>
      </DialogOverlay>
    </div>
  );
}

export default Article;
