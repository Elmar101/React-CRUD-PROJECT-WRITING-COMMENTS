import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import { api } from "../../api/Api";
interface Props {
  detailOfWritnig: {
    id: number;
    title: string;
    content: string;
    created_at: Date | null;
  };
}
const DeleteModal = (props: Props) => {
  const { detailOfWritnig } = props;
  const navigate = useNavigate();
  const [err, setErr] = useState<string>("");
  const [open, setOpen] = useState(false);
  const show = useCallback(() => {
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const deleteWriting = useCallback(
    (id: number) => {
      api()
        .delete(`/posts/${id}`)
        .then(() => {
          setErr("");
          close();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setErr(" Error for Delete Writing ");
        });
    },
    [navigate, close]
  );
  return (
    <React.Fragment>
      <Button color={"red"} onClick={show}>
        Delete
      </Button>

      <Modal size={"small"} open={open} onClose={close}>
        <Modal.Header>Delete Your Writing</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your Writing</p>
          {err && <p style={{ color: "red" }}>{err}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            Cancle
          </Button>
          <Button
            positive
            icon="delete"
            labelPosition="right"
            content="yes delete"
            onClick={() => deleteWriting(detailOfWritnig.id)}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};
export default DeleteModal;
