'use client';

import React from "react";
import { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Image } from '@react-pdf/renderer';
import { SafeListing, SafeUser } from "@/app/types";

import { HitchhikeBase64 } from './imageData';

import QRCode from 'qrcode';
import QrCode from 'react-qr-code';

 
// const generateQRCodeBase64 = async (text: string): Promise<string> => {
//     try {
//       const qrCodeDataURL = await QRCode.toDataURL(text);
//       console.log('Generated QR code:', qrCodeDataURL); 
//       return qrCodeDataURL;
//     } catch (error) {
//       console.error('Failed to generate QR code:', error);
//       return '';
//     }
//   };

interface CustomReservation {
    startDate: Date | undefined;
    endDate: Date| undefined;
    totalPrice: number;
  }

interface MyPdfDocumentProps {
  reservation: CustomReservation;
  currentUser: SafeUser | null | undefined;
  listing: SafeListing & {
    user: SafeUser;
  };
  qrCode: string;
}

const styles = StyleSheet.create({
    page: {
      padding: 20,
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
      marginBottom: 3,
    },
  });

const MyPdfDocument: React.FC<MyPdfDocumentProps> = ({ reservation, currentUser, listing, qrCode }) => {
    // const [qrCodeBase64, setQrCodeBase64] = useState('');


    // useEffect(() => {
    //     generateQRCodeBase64(listing.id).then((generatedQrCode) => {
    //       console.log('Setting qrCodeBase64:', generatedQrCode); 
    //       setQrCodeBase64(generatedQrCode);
    //     });
    //   }, [listing.id]);
      
  return (
    <Document>
    <Page style={styles.page}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        <Image src={HitchhikeBase64} style={{ width: 320, height: 100 }} />
        </View>
      <View style={styles.section}>
        <Text style={styles.title}>Reservation Confirmation</Text>
        <Text style={styles.text}>Reservation ID: {listing.id}</Text>
        <Text style={styles.text}>
          From{" "}
          {reservation.startDate
            ? reservation.startDate.toLocaleString()
            : "N/A"}{" "}
          to{" "}
          {reservation.endDate
            ? reservation.endDate.toLocaleString()
            : "N/A"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Dear {currentUser?.name},</Text>
        <Text style={styles.text}>
          Thank you for choosing Hitchike! We are pleased to confirm your
          reservation of the following car:
        </Text>
        <Text style={styles.subtitle}>Car: {listing.title}</Text>
        <Text style={styles.subtitle}>
          Location: {listing.locationValue}, Morocco
        </Text>
        <Text style={styles.subtitle}>Host: Mr. {listing.user.name}</Text>
        <Text style={styles.subtitle}>
          Contact Email: {listing.user.email}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Reservation Details:</Text>
        <Text style={styles.text}>
          Start Date:{" "}
          {reservation.startDate
            ? reservation.startDate.toLocaleString()
            : "N/A"}
        </Text>
        <Text style={styles.text}>
          End Date:{" "}
          {reservation.endDate
            ? reservation.endDate.toLocaleString()
            : "N/A"}
        </Text>
        <Text style={styles.text}>
          Total Price: {reservation.totalPrice} $
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          Please note that the payment for your reservation will be made
          directly to the host upon meeting. Kindly bring the exact amount in
          cash to settle the payment. We recommend confirming the payment
          method and any additional details with the host, Mr.{" "}
          {listing.user.name}, via email ({listing.user.email}).
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          We kindly request that you bring a copy of this document with you to
          the agreed meeting time and place for smooth check-in. Should you
          have any further questions or require assistance, please do not
          hesitate to contact us at hitchike.pfs@gmail.com.
        </Text>
        <Text style={styles.text}>
          Thank you for choosing Hitchike, and we wish you a pleasant
          experience!
        </Text>
        <Text style={styles.subtitle}>Best regards, Hitchike Team</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
       <QrCode value={listing.id} size={200} />
       {qrCode && <Image src={qrCode} style={{ width: 150, height: 150 }}/>}
      </View>
    </Page>
  </Document>
  );
};

export default MyPdfDocument;

