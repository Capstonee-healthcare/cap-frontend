import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  type ScrollView as RNScrollView, // alias if you want clarity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGeminiResponse, ChatMessage } from './../../api/geminiApi';

export default function AIChatScreen() {
  // ✅ Use correct ref type:
  const scrollViewRef = useRef<RNScrollView>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { text: trimmed, sender: 'user' },
    ];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await getGeminiResponse(newMessages);
      setMessages([...newMessages, { text: reply, sender: 'model' }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages([
        ...newMessages,
        { text: 'Sorry, I could not respond at this time.', sender: 'model' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderBotMessage = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      const isBold = part.startsWith('**') && part.endsWith('**');
      return (
        <React.Fragment key={`part-${idx}`}>
          <Text style={isBold ? styles.boldText : styles.normalText}>
            {isBold ? part.slice(2, -2) : part}
          </Text>
        </React.Fragment>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.chatWrapper}>
        <ScrollView
          style={styles.chatBox}
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef} // ✅ Safe now!
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
        >
          <View>
            {messages.map((msg, idx) => (
              <View
                key={`msg-${idx}`}
                style={[
                  styles.messageBubble,
                  msg.sender === 'model' ? styles.botBubble : styles.userBubble,
                ]}
              >
                {msg.sender === 'model' ? (
                  <Text style={styles.botText}>{renderBotMessage(msg.text)}</Text>
                ) : (
                  <Text style={styles.userText}>{msg.text}</Text>
                )}
              </View>
            ))}

            {isTyping && (
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={styles.botText}>KYNTRA is typing...</Text>
                <ActivityIndicator size="small" color="#333" style={{ marginTop: 5 }} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          autoCorrect
          returnKeyType="send"
          onSubmitEditing={handleSend}
          editable={!isTyping}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[styles.sendButton, isTyping && styles.sendButtonDisabled]}
          disabled={isTyping}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatWrapper: { flex: 1 },
  chatBox: { flex: 1, paddingHorizontal: 16 },
  chatContent: { paddingVertical: 20 },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 20,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#333',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  botText: {
    color: '#333',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  normalText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
    height: 45,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 10,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
