import { nanoid } from "@reduxjs/toolkit";
import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../config";
import { FIREBASE } from "../constants/firebase";
import { ERRORS } from "../constants/message";
import {
  CreateWorkAttachmentSchema,
  ICreateWorkAttachmentSchema,
  IUpdateWorkAttachmentSchema,
  UpdateWorkAttachmentSchema,
} from "@/model/work-attachment-form";
import { METHOD } from "@/components/constants/method";
import { transformData } from "../helper/data";

const useWorkAttachment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const actionLogCollectionRef = collection(db, FIREBASE.COLLECTION.ACTION_LOGS);

  const createWorkAttachment = useCallback(
    async (data: Partial<ICreateWorkAttachmentSchema>): Promise<IApiResponse> => {
      try {
        setIsLoading(true);
        await runTransaction(db, async (transaction) => {
          const workAttachmentId = nanoid();
          const workAttachmentDoc = doc(db, FIREBASE.COLLECTION.WORK_ATTACHMENTS, workAttachmentId);

          const workAttachmentSnapshot = await transaction.get(workAttachmentDoc);
          if (workAttachmentSnapshot.exists()) throw new Error(ERRORS.GENERIC.ALREADY_EXISTS);

          const workAttachmentValidation = CreateWorkAttachmentSchema.safeParse(data);
          if (!workAttachmentValidation.success) {
            throw new Error(ERRORS.GENERIC.VALIDATION_FAILED);
          }

          const createData = transformData(data, METHOD.POST);
          transaction.set(workAttachmentDoc, createData);

          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: "",
            action: METHOD.POST,
            status: "success",
            model: FIREBASE.COLLECTION.WORKS,
            itemId: workAttachmentId,
            timestamp: serverTimestamp(),
          });
        });

        return {
          status: "success",
          data: data,
        };
      } catch (error) {
        const apiError = error as Error;
        return {
          status: "failed",
          error: error,
          message: apiError?.message || ERRORS[505],
        };
      } finally {
        setIsLoading(false);
      }
    },
    [actionLogCollectionRef],
  );

  const updateWorkAttachment = useCallback(
    async (workAttachmentId: string, data: Partial<IUpdateWorkAttachmentSchema>): Promise<IApiResponse> => {
      try {
        setIsLoading(true);
        await runTransaction(db, async (transaction) => {
          const workAttachmentDoc = doc(db, FIREBASE.COLLECTION.WORK_ATTACHMENTS, workAttachmentId);

          const workAttachmentSnapshot = await transaction.get(workAttachmentDoc);
          if (!workAttachmentSnapshot.exists()) throw new Error(ERRORS.GENERIC.ITEM_NOT_FOUND);

          const workAttachmentValidation = UpdateWorkAttachmentSchema.safeParse(data);
          if (!workAttachmentValidation.success) {
            throw new Error(ERRORS.GENERIC.VALIDATION_FAILED);
          }

          const updateData = transformData(data, METHOD.PUT);
          transaction.update(workAttachmentDoc, updateData);

          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: "",
            action: METHOD.POST,
            status: "success",
            model: FIREBASE.COLLECTION.WORKS,
            itemId: workAttachmentId,
            timestamp: serverTimestamp(),
          });
        });

        return {
          status: "success",
          data: data,
        };
      } catch (error) {
        const apiError = error as Error;
        return {
          status: "failed",
          error: error,
          message: apiError?.message || ERRORS[505],
        };
      } finally {
        setIsLoading(false);
      }
    },
    [actionLogCollectionRef],
  );

  const deleteWorkAttachment = useCallback(
    async (workAttachmentId: string): Promise<IApiResponse> => {
      try {
        setIsLoading(true);
        await runTransaction(db, async (transaction) => {
          const workAttachmentDoc = doc(db, FIREBASE.COLLECTION.WORK_ATTACHMENTS, workAttachmentId);

          const workAttachmentSnapshot = await transaction.get(workAttachmentDoc);
          if (!workAttachmentSnapshot.exists()) throw new Error(ERRORS.GENERIC.ITEM_NOT_FOUND);

          const deleteData = transformData({}, METHOD.DELETE);
          transaction.update(workAttachmentDoc, deleteData);

          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: "",
            action: METHOD.DELETE,
            status: "success",
            model: FIREBASE.COLLECTION.WORK_ATTACHMENTS,
            itemId: workAttachmentId,
            timestamp: serverTimestamp(),
          });
        });

        return {
          status: "success",
          data: {},
        };
      } catch (error) {
        const apiError = error as Error;
        return {
          status: "failed",
          error: error,
          message: apiError?.message || ERRORS[505],
        };
      } finally {
        setIsLoading(false);
      }
    },
    [actionLogCollectionRef],
  );

  return {
    isLoading,
    createWorkAttachment,
    updateWorkAttachment,
    deleteWorkAttachment,
  };
};

export default useWorkAttachment;
