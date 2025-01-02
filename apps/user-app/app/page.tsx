"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { CreditCard, History, PlusCircle, SendHorizonal, Wallet } from "lucide-react";
import { useState } from "react";
import { AddMoney } from "../components/AddMoneyCard";
import AccountInfo from "../components/dashboard/AccountInfo";
import { SendCard } from "../components/SendCard";

export default function Page() {
  const { isOpen: isSendOpen, onOpen: onSendOpen, onOpenChange: onSendOpenChange } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState("wallet");

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardBody>
          <AccountInfo />
        </CardBody>
      </Card>

      <Tabs
        aria-label="Dashboard options"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        className="mb-8"
      >
        <Tab
          key="wallet"
          title={
            <div className="flex items-center space-x-2">
              <Wallet size={18} />
              <span>Wallet</span>
            </div>
          }
        >
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Quick Actions</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onPress={onSendOpen}
                  color="primary"
                  startContent={<SendHorizonal size={18} />}
                  className="w-full sm:w-auto"
                >
                  Send Money
                </Button>
                <Button
                  onPress={onAddOpen}
                  color="success"
                  startContent={<PlusCircle size={18} />}
                  className="w-full sm:w-auto"
                >
                  Add Money
                </Button>
                <Button color="secondary" startContent={<CreditCard size={18} />} className="w-full sm:w-auto">
                  Link Bank Account
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2">
              <History size={18} />
              <span>Transaction History</span>
            </div>
          }
        >
          <AccountInfo />
        </Tab>
      </Tabs>

      <Modal isOpen={isSendOpen} onOpenChange={onSendOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Transfer Money</ModalHeader>
              <ModalBody>
                <SendCard />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Money to Wallet</ModalHeader>
              <ModalBody>
                <AddMoney />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
