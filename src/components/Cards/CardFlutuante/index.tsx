import React from "react";
import { Modal, View, Pressable } from "react-native";

interface FloatingCardProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function FloatingCard({ visible, onClose, children }: FloatingCardProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Fundo escuro que fecha ao clicar */}
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center"
        onPress={onClose}
      >
        {/* Card (bloqueia o clique pra não fechar ao tocar dentro) */}
      <Pressable className="w-[92%] bg-[#05011a] rounded-2xl p-4" onPress={() => {}}>
        {children}
      </Pressable>
      </Pressable>
    </Modal>
  );
}
