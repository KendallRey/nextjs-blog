import { nanoid } from "@reduxjs/toolkit";
import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../config";
import { FIREBASE } from "../constants/firebase";
import { ERRORS } from "../constants/message";
import {} from "@/model/work-attachment-form";
import { METHOD } from "@/components/constants/method";
import { transformData } from "../helper/data";
import { CreateWorkSchema, ICreateWorSchema, IUpdateWorkSchema, UpdateWorkSchema } from "@/model/work-form";

const useWork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const actionLogCollectionRef = collection(db, FIREBASE.COLLECTION.ACTION_LOGS);

  const createWorkApi = useCallback(
    async (data: Partial<ICreateWorSchema>): Promise<IApiResponse> => {
      try {
        setIsLoading(true);
        await runTransaction(db, async (transaction) => {
          const workId = nanoid();
          const workDoc = doc(db, FIREBASE.COLLECTION.WORKS, workId);

          const workSnapshot = await transaction.get(workDoc);
          if (workSnapshot.exists()) throw new Error(ERRORS.GENERIC.ALREADY_EXISTS);

          const workValidation = CreateWorkSchema.safeParse(data);
          if (!workValidation.success) {
            throw new Error(ERRORS.GENERIC.VALIDATION_FAILED);
          }

          const createData = transformData(data, METHOD.POST);
          transaction.set(workDoc, createData);

          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: "",
            action: METHOD.POST,
            status: "success",
            model: FIREBASE.COLLECTION.WORKS,
            itemId: workId,
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

  const updateWorkApi = useCallback(
    async (workId: string, data: Partial<IUpdateWorkSchema>): Promise<IApiResponse> => {
      try {
        setIsLoading(true);
        await runTransaction(db, async (transaction) => {
          const workDoc = doc(db, FIREBASE.COLLECTION.WORKS, workId);

          const workSnapshot = await transaction.get(workDoc);
          if (!workSnapshot.exists()) throw new Error(ERRORS.GENERIC.ITEM_NOT_FOUND);

          const workValidation = UpdateWorkSchema.safeParse(data);
          if (!workValidation.success) {
            throw new Error(ERRORS.GENERIC.VALIDATION_FAILED);
          }

          const updateData = transformData(data, METHOD.PUT);
          transaction.update(workDoc, updateData);

          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: "",
            action: METHOD.POST,
            status: "success",
            model: FIREBASE.COLLECTION.WORKS,
            itemId: workId,
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

  const deleteWorkApi = useCallback(
    async (workId: string): Promise<IApiResponse> => {
      try {
        setIsLoading(true);
        await runTransaction(db, async (transaction) => {
          const workDoc = doc(db, FIREBASE.COLLECTION.WORKS, workId);

          const workSnapshot = await transaction.get(workDoc);
          if (!workSnapshot.exists()) throw new Error(ERRORS.GENERIC.ITEM_NOT_FOUND);

          const deleteData = transformData({}, METHOD.DELETE);
          transaction.update(workDoc, deleteData);

          await addDoc(actionLogCollectionRef, {
            userId: null,
            event: "",
            action: METHOD.DELETE,
            status: "success",
            model: FIREBASE.COLLECTION.WORKS,
            itemId: workId,
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
    createWorkApi,
    updateWorkApi,
    deleteWorkApi,
  };
};

export default useWork;
